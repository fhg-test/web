import { PureComponent } from 'react';
import { connect } from 'react-redux';
import css from 'styled-jsx/css';
import {
  Entity,
  Action,
  Booking,
  BookingType,
  BookingStatus,
} from '@fhg-test/core';
import * as rest from '@fhg-test/rest';

import { DefaultProps } from '@app/pages/types';
import Layout from '@app/components/Layout';
import Btn from '@app/components/Common/Btn';
import BookingCreateForm from '@app/components/Form/BookingCreate';

import userSelectors from '@app/store/user/selectors';
import { withAuthSync } from '@app/utils/acl';

type HomeProps = DefaultProps & {
  readonly hasAccess: Function,
};

type HomeState = {
  readonly bookings: ReadonlyArray<Booking>,
  readonly bookingTypes: {
    readonly [key: string]: BookingType,
  },
  readonly bookingStatuses: {
    readonly [key: string]: BookingStatus,
  },
};

const styles = css`
  div.booking-create {
    @apply border border-grey-dark p-2 mb-4;
  }

  table {
    @apply w-full;

    thead tr th {
      @apply text-left uppercase;
    }

    tbody tr td {
      &.dates {
        > div {
          @apply flex justify-between;

          &:not(:last-child) {
            @apply pb-2;
          }

          > div:first-child {
            @apply py-1;
          }
        }
      }

      &.no-items {
        @apply text-center;
      }
    }

    thead tr th,
    tbody tr td {
      @apply py-1 px-2 align-top border border-grey-dark;

      &:nth-child(6) {
        @apply text-right;
      }
    }
  }
`;

class Home extends PureComponent<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      bookings: [],
      bookingTypes: {},
      bookingStatuses: {},
    };

    this.handleCreateBooking = this.handleCreateBooking.bind(this);
    this.handleApproveBooking = this.handleApproveBooking.bind(this);
    this.handleRejectBooking = this.handleRejectBooking.bind(this);
  }

  async handleCreateBooking(data: Booking) {
    const { bookings } = this.state;
    const newBooking = await rest.bookings.create(data);
    const newBookings = bookings.concat(newBooking);

    this.setState({ bookings: newBookings });
  }

  async handleApproveBooking(id: string, dateIndex: number) {
    const { bookings } = this.state;
    const updatedBooking = await rest.bookings.approve(id, dateIndex);
    const updatedBookings = bookings.map(booking =>
      booking.id === id ? updatedBooking : booking,
    );

    this.setState({ bookings: updatedBookings });
  }

  async handleRejectBooking(id: string) {
    const { bookings } = this.state;
    const updatedBooking = await rest.bookings.reject(id);
    const updatedBookings = bookings.map(booking =>
      booking.id === id ? updatedBooking : booking,
    );

    this.setState({ bookings: updatedBookings });
  }

  render() {
    const { hasAccess } = this.props;
    const { bookings, bookingTypes, bookingStatuses } = this.state;

    return (
      <Layout>
        <div className="booking-create">
          <BookingCreateForm
            bookingTypes={Object.values(bookingTypes)}
            onSubmit={this.handleCreateBooking}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Location</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{bookingTypes[booking.type as string].name}</td>
                  <td>{booking.location}</td>
                  <td className="dates">
                    {booking.dates.map((date, dateIndex) => (
                      <div key={dateIndex}>
                        <div>
                          {dateIndex + 1}. {new Date(date).toLocaleString()}
                        </div>
                        <div>
                          {booking.status === 'pending-review' &&
                          hasAccess([Entity.Booking, Action.Update]) ? (
                            <Btn
                              size="sm"
                              style="primary"
                              onClick={() =>
                                this.handleApproveBooking(booking.id, dateIndex)
                              }
                            >
                              Approve
                            </Btn>
                          ) : (
                            booking.status === 'approved' &&
                            booking.approvedDate === date && (
                              <Btn size="sm" style="primary" disabled>
                                Approved
                              </Btn>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </td>
                  <td>{bookingStatuses[booking.status as string].name}</td>
                  <td>
                    {booking.status === 'pending-review' &&
                      hasAccess([Entity.Booking, Action.Update]) && (
                        <Btn
                          size="sm"
                          onClick={() => this.handleRejectBooking(booking.id)}
                        >
                          Reject
                        </Btn>
                      )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-items">
                  No bookings yet!
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <style jsx>{styles}</style>
      </Layout>
    );
  }

  async componentDidMount() {
    const [bookings, bookingTypes, bookingStatuses] = await Promise.all([
      rest.bookings.list(),
      rest.bookingTypes.list(),
      rest.bookingStatuses.list(),
    ]);

    this.setState({
      bookings,
      bookingTypes: bookingTypes.reduce(
        (prev, type) => ({ ...prev, [type.id]: type }),
        {},
      ),
      bookingStatuses: bookingStatuses.reduce(
        (prev, status) => ({ ...prev, [status.id]: status }),
        {},
      ),
    });
  }
}

const mapStateToProps = (state: any) => ({
  hasAccess: userSelectors.hasAccess(state),
});

const mapDispatchToProps = {};

export default withAuthSync()(
  connect(mapStateToProps, mapDispatchToProps)(Home),
);
