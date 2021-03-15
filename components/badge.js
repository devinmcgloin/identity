const Badge = ({
  handleClick,
  handleDismiss,
  selected,
  children,
  ...props
}) => (
  <span
    {...props}
    className={`cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${
      selected
        ? 'bg-sunset-100 text-gray-800 dark:bg-sunset-700 dark:text-gray-200'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    } mr-2 mb-2`}
  >
    <div onClick={handleClick}>{children}</div>
    {selected && (
      <svg
        onClick={handleDismiss}
        class="ml-2 h-2 w-2"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 8 8"
      >
        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    )}
  </span>
);

export default Badge;
