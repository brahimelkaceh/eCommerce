import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EditProductModal = ({ rowData, onSave, onCancel }) => {
  const [editedRow, setEditedRow] = useState({});

  useEffect(() => {
    setEditedRow({ ...rowData });
  }, [rowData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRow((prevRow) => ({ ...prevRow, [name]: value }));
  };

  const handleSaveChanges = () => {
    Swal.fire({
      title: "Save Changes",
      text: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Discard",
    }).then((result) => {
      if (result.isConfirmed) {
        onSave(editedRow);
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        onCancel();
        Swal.fire("Changes discarded", "", "info");
      }
    });
  };

  return (
    <div className="modal">
      {/* Your modal content and form for editing the product */}
      <input
        type="text"
        name="productName"
        value={editedRow.productName || ""}
        onChange={handleInputChange}
      />
      {/* Other input fields go here */}
      <button onClick={handleSaveChanges}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditProductModal;
