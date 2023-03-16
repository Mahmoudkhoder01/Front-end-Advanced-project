import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Update() {
  const [name, setName] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/api/grade`).then((response) => {
      setName(response.data);
    });
  }, []);

  return (
    <div>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </Form.Field>
        <Link to="/update">
          <Form.Field>
            <Button type="submit" onClick={() => setData(data)}>
              Update
            </Button>
          </Form.Field>
        </Link>
      </Form>
    </div>
  );
}
