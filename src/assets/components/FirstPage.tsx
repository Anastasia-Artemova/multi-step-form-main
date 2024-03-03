import { Heading, Text } from "@chakra-ui/react";
import "./FirstPage.css";
import { useContext, useEffect, useRef, useState } from "react";
import ErrorContext from "../context/error";

const FirstPage = () => {
  const [field, setField] = useState<Record<string, string>>({
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    phone: localStorage.getItem("phone") || "",
  });
  const items = [
    {
      id: "name",
      description: "Name",
      placeholder: "e.g. Stephen King",
    },
    {
      id: "email",
      description: "Email Address",
      placeholder: "e.g. stephenking@lorem.com",
    },
    {
      id: "phone",
      description: "Phone Number",
      placeholder: "e.g. +1 234 567 890",
    },
  ];

  const ref = useRef<{ [key: string]: HTMLParagraphElement | null }>({});

  const { setIsError } = useContext(ErrorContext);

  const fillingForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setField({ ...field, [id]: event.target.value });
    localStorage.setItem(id, event.target.value);
  };

  useEffect(() => {
    Object.entries(field).map(([key, value]) => {
      const element = ref.current[key]?.style;
      if (value === "" && element !== undefined) {
        element.display = "block";
        setIsError(true);
      } else {
        if (element !== undefined) element.display = "none";
      }
    });
    return () => setIsError(false);
  });

  return (
    <>
      <Heading fontWeight="bold" color="hsl(213, 96%, 18%)">
        Personal Info
      </Heading>
      <Text color="hsl(231, 11%, 63%)" fontSize="13px">
        Please provide your name, email address, and phone number
      </Text>
      {items.map((item) => (
        <div className="mb-3" key={item.id} style={{ position: "relative" }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "5px",
            }}
            htmlFor={item.id}
            className="form-label"
          >
            {item.description}
          </label>
          <input
            placeholder={item.placeholder}
            id={item.id}
            type="text"
            className="form-control"
            onChange={(e) => fillingForm(e, item.id)}
            value={field[item.id]}
          />
          <p
            ref={(el) => {
              ref.current[item.id] = el;
            }}
            style={{
              color: "red",
              position: "absolute",
              top: "5px",
              right: "0",
              fontSize: "12px",
              fontStyle: "italic",
              display: "none",
            }}
          >
            This field is required
          </p>
        </div>
      ))}
    </>
  );
};

export default FirstPage;
