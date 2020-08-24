import css from 'styled-jsx/css';

const { className, styles } = css.resolve`
  .btn {
    @apply outline-none rounded text-center;

    &[disabled], &.disabled {
      @apply cursor-not-allowed;
    }
  }

  .btn-transparent {
    &:hover,
    &:focus,
    &:active, &.active {
      @apply underline;
    }

    &[disabled], &.disabled {
      @apply text-grey;
    }
  }

  .btn-default {
    &:not(.outline) {
      @apply bg-grey-light;
    }

    &.outline {
      @apply border border-grey-light;
    }

    &:hover,
    &:focus,
    &:active, &.active {
      @apply bg-grey;
    }

    &[disabled], &.disabled {
      @apply text-grey bg-grey-lighter;
    }
  }

  .btn-primary {
    @apply font-bold;
    @apply px-4 !important;

    &:not(.outline) {
      @apply bg-yellow-dark;
    }

    &.outline {
      @apply text-yellow-dark border border-yellow-dark;
    }

    &:hover,
    &:focus,
    &:active, &.active {
      &:not(.outline) {
        @apply bg-yellow;
      }

      &.outline {
        @apply text-black bg-yellow-dark;
      }
    }

    &[disabled], &.disabled {
      @apply text-grey bg-yellow-light;
    }
  }

  .btn-base {
    @apply p-2;
  }

  .btn-sm {
    @apply px-2 py-1;
  }

  .btn-xs {
    @apply p-0;
  }
`;

export { className, styles };
