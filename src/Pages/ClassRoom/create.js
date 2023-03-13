import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";

export default function Create() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  const postData = () => {
    axios
      .post(`http://localhost:8000/api/grade/id`, {
        id,
        name,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>id</label>
          <input placeholder="id" onChange={(e) => setId(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Name</label>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </Form.Field>
        <Button onClick={postData} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
