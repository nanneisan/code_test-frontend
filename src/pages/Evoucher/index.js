import React, { useState, useEffect } from "react";
import Label from "../../components/Label";
import Table from "../../components/Table";

//services
import { getAll } from "../../services/evoucherService";

const tbl_header = [
  "Title",
  "Description",
  "Expiry Date",
  "Amount",
  "Quantity",
];

function Evoucher() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function fetch() {
      const response = await getAll();
      if (response) {
        setLists(response.data.data);
      }
    }
    fetch();
  }, []);
  return (
    <div>
      <Label variant="h5">Evoucher List</Label>
      <Table label="evoucher" header={tbl_header} data={lists} />
    </div>
  );
}

export default Evoucher;
