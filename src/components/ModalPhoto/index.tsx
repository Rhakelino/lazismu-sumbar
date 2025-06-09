import React, { useEffect, useState } from 'react';

const ModalPhoto: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  initialData: { photos: string };
}> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [localFormData, setLocalFormData] = useState(initialData);

  useEffect(() => {
    setLocalFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFormData({ ...localFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(localFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black border border-neutral-500 text-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Photo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="photos"
            value={localFormData.photos}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 w-full rounded-lg bg-neutral-900 border-neutral-700 text-white"
            required
          />
          <button type="submit" className="bg-white text-black hover:bg-gray-200 p-2 rounded-lg w-full font-semibold">
            Update Photo
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-white border border-neutral-500 hover:bg-neutral-800 px-2 py-1 rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalPhoto;