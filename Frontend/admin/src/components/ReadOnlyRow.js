import React from "react";
import { Button } from "reactstrap";

const ReadOnlyRow = ({ cat, handleEditClick }) => {
  return (
    <tr>
      <td>{cat.nomcat}</td>
      <td>
        <Button
          type="button" 
          className="btn-secondary" 
          size="sm" 
          onClick={(event) => handleEditClick(event, cat)}
        >
          Edit
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;