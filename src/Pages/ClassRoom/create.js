import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";

export default function Create() {
  const [name, setName] = useState("");

  const postData = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/grade`, {
        name,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form className="create-form">
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

