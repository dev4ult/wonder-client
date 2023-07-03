function ProfileHistory({ title, description, amount = 0, icon, color = '' }) {
  return (
    <div className="border-2 p-5 hover:shadow cursor-pointer max-w-xs">
      <div className="flex gap-3 justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-1 items-center">
          <icon size="1.2rem" className={color} />
          <span className="text-black/30">{amount}</span>
        </div>
      </div>
      <p className="text-sm mt-1">{description}</p>
    </div>
  );
}

export default ProfileHistory;
