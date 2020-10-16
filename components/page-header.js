export const PageHeader = ({ title, subtitle, className, children }) => (
  <div className={className}>
    <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
      {title}
    </h2>
    <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
      <p className="text-xl leading-7 text-gray-500">{children || subtitle}</p>
    </div>
  </div>
);
