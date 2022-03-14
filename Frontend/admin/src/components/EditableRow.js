import React from "react";
import { Button } from "reactstrap";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          name="nomcat"
          value={editFormData.nomcat}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <Button type="submit" className="btn-secondary" size="sm">Save</Button>
        <Button type="button" className="btn-secondary" size="sm" 
                onClick={handleCancelClick}>
          Annuler
        </Button>
      </td>
    </tr>
  );
};


export default EditableRow