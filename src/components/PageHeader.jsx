export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div className="flex justify-between items-end mb-8 mt-4 px-2">
      <div>
        <h2 className="text-3xl font-medium text-black mb-1">{title}</h2>
        <div className="flex items-center space-x-2 text-[10px] font-medium uppercase tracking-widest text-black/30">
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              <span className={index === breadcrumb.length - 1 ? "text-black" : ""}>
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
      {/* Tempat tombol "New Appointment" atau "Add Service" */}
      <div>{children}</div>
    </div>
  );
}