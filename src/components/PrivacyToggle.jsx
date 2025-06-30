import React from "react";

const PrivacyToggle = ({ isPrivate, onToggle }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="privacy-toggle" className="font-semibold">
        Privé profiel
      </label>
      <input
        id="privacy-toggle"
        type="checkbox"
        checked={isPrivate}
        onChange={onToggle}
        className="w-5 h-5 cursor-pointer"
      />
    </div>
  );
};

export default PrivacyToggle;
