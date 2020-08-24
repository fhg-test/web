import Router from 'next/router';
import { Fragment, PureComponent } from 'react';
import css from 'styled-jsx/css';
import { connect } from 'react-redux';
import * as rest from '@fhg-test/rest';

import { DefaultProps } from '@app/components/types';
import Btn from '@app/components/Common/Btn';
import List, { ListItemProps } from '@app/components/Common/List';

import userActions from '@app/store/user/actions';
import userSelectors from '@app/store/user/selectors';

type UserProps = DefaultProps & {
  readonly isSignedIn: boolean;
  readonly displayName: string;
  readonly signOut: Function;
};

type UserState = {
  readonly show: boolean;
};

const styles = css`
  div {
    @apply inline-block relative;
  }
`;

const listCss = css.resolve`
  ul {
    @apply absolute pin-r mt-1 bg-grey-lightest
      rounded rounded-t-none border border-grey-light shadow-lg;

    > :global(li:not(:first-child)) {
      @apply border-t border-grey-lighter;
    }

    > :global(li > a) {
      @apply p-2 text-black whitespace-no-wrap no-underline;
      min-width: 9rem;

      &:hover {
        @apply bg-grey;
      }
    }
  }
`;

class User extends PureComponent<UserProps, UserState> {
  constructor(props: UserProps) {
    super(props);

    this.state = {
      show: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleToggle() {
    const { show } = this.state;

    this.setState({
      show: !show,
    });
  }

  async handleSignOut() {
    const { signOut } = this.props;

    await rest.user.sessions.delCurrent();

    signOut();
    Router.replace('/auth/sign-in');
  }

  render() {
    const { className, isSignedIn, displayName } = this.props;
    const { show } = this.state;

    if (!isSignedIn) {
      return null;
    }

    const items: ReadonlyArray<ListItemProps> = [
      {
        label: 'Sign Out',
        onClick: this.handleSignOut,
      },
    ];

    return (
      <Fragment>
        <div className={className}>
          <Btn style="primary" onClick={this.handleToggle}>
            {displayName}
          </Btn>

          {show && (
            <Fragment>
              <List
                className={listCss.className}
                items={items}
                itemTemplate={itemTemplate}
              />

              {listCss.styles}
            </Fragment>
          )}
        </div>

        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

const itemTemplate = ({ label, onClick }: ListItemProps) => (
  <a onClick={e => onClick(e)}>
    <span>{label}</span>
  </a>
);

const mapStateToProps = (state: any) => ({
  isSignedIn: userSelectors.isSignedIn(state),
  displayName: userSelectors.getDisplayName(state),
});

const mapDispatchToProps = {
  signOut: userActions.signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
export { UserProps };
