import { Fragment, PureComponent, FormEvent } from 'react';
import css from 'styled-jsx/css';

import { DefaultProps } from '@app/components/types';
import SelectInput from '@app/components/Common/Input/Select';
import Input from '@app/components/Common/Input';
import DateInput from '@app/components/Common/Input/Date';
import SubmitBtn from '@app/components/Common/Btn/Submit';
import { BookingType } from '@fhg-test/core';

type BookingCreateProps = DefaultProps & {
  readonly bookingTypes: ReadonlyArray<BookingType>,
  readonly onSubmit: (data: any) => Promise<void>;
};

type BookingCreateState = {
  readonly type: string;
  readonly location: string;
  readonly dates: ReadonlyArray<Date>;
};

const styles = css`
  form {
    > h4 {
      @apply mb-2;
    }

    > div {
      &:not(:first-of-type) {
        @apply mt-2;
      }

      &:first-of-type {
        @apply flex;

        > div {
          @apply flex-1;

          &:not(:first-child) {
            @apply ml-2;
          }
        }
      }

      &:nth-of-type(2) > div {
        @apply flex;

        > :global(input) {
          @apply flex-1;

          &:not(:first-child) {
            @apply ml-2;
          }
        }
      }

      &:last-of-type {
        @apply text-right;
      }
    }
  }

  label {
    @apply inline-block mb-2;
  }
`;

const initialState = {
  type: '',
  location: '',
  dates: [new Date(), new Date(), new Date()],
};

class BookingCreate extends PureComponent<
  BookingCreateProps,
  BookingCreateState
> {
  constructor(props: BookingCreateProps) {
    super(props);

    this.state = { ...initialState };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleDateFieldChange = this.handleDateFieldChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFieldChange(field: string, value: string) {
    this.setState({
      ...this.state,
      [field]: value,
    });
  }

  handleDateFieldChange(index: number, value: Date) {
    const { dates } = this.state;
    const newDates = dates.map((date, i) => (i === index ? value : date));

    this.setState({
      ...this.state,
      dates: newDates,
    });
  }

  async handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    const { onSubmit } = this.props;

    await onSubmit(this.state);

    this.setState({ ...initialState });
  }

  render() {
    const { className, bookingTypes } = this.props;
    const { type, location, dates } = this.state;

    return (
      <Fragment>
        <form className={className} onSubmit={this.handleFormSubmit}>
          <h4>New Booking</h4>

          <div>
            <div>
              <label>Type</label>

              <SelectInput
                value={type}
                onChange={(value: string) =>
                  this.handleFieldChange('type', value)
                }
                required
              >
                <option value="">Select type...</option>
                {bookingTypes.map((bookingType, index) => (
                  <option key={index} value={bookingType.id}>
                    {bookingType.name}
                  </option>
                ))}
              </SelectInput>
            </div>

            <div>
              <label>Location</label>

              <Input
                value={location}
                onChange={(value: string) =>
                  this.handleFieldChange('location', value)
                }
                placeholder="Enter location..."
                required
              />
            </div>
          </div>

          <div>
            <label>Date & Time</label>

            <div>
              <DateInput
                value={new Date(dates[0]).toISOString()}
                onChange={(value: Date) => this.handleDateFieldChange(0, value)}
                required
              />
              <DateInput
                value={new Date(dates[1]).toISOString()}
                onChange={(value: Date) => this.handleDateFieldChange(1, value)}
                required
              />
              <DateInput
                value={new Date(dates[2]).toISOString()}
                onChange={(value: Date) => this.handleDateFieldChange(2, value)}
                required
              />
            </div>
          </div>

          <div>
            <SubmitBtn>Create New Booking</SubmitBtn>
          </div>
        </form>

        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

export default BookingCreate;
export { BookingCreateProps };
