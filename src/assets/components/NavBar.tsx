import React from "react";

interface Props {
  id: number | string;
}

const NavBar = ({ id }: Props) => {
  const elem_style: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    columnGap: "10px",
    alignItems: "center",
    color: "white",
  };

  const number_style: React.CSSProperties = {
    marginTop: "-10px",
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    border: "2px solid lightgray",
    textAlign: "center",
    cursor: "pointer",
  };

  const chosen_number_style: React.CSSProperties = {
    marginTop: "-10px",
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    border: "2px solid lightgray",
    textAlign: "center",
    cursor: "pointer",
    color: "hsl(213, 96%, 18%)",
    backgroundColor: "hsl(206, 94%, 87%)",
  };

  const upper_text_style: React.CSSProperties = {
    color: "hsl(231, 11%, 63%)",
    fontSize: "10px",
    fontWeight: "bold",
  };

  const lower_text_style: React.CSSProperties = {
    color: "white",
    fontWeight: "bold",
    fontSize: "12px",
  };

  const items = [
    {
      index: "",
      description: "YOUR INFO",
    },
    {
      index: 2,
      description: "SELECT PLAN",
    },
    {
      index: 3,
      description: "ADD-ONS",
    },
    {
      index: 4,
      description: "SUMMARY",
    },
  ];

  return (
    <ul style={{ listStyleType: "none" }}>
      {items.map((item) => (
        <li key={item.index}>
          {item.index == id ? (
            <div style={elem_style}>
              <div style={chosen_number_style}>
                {item.index == "" ? 1 : item.index}
              </div>
              <div>
                <p style={upper_text_style}>
                  STEP {item.index == "" ? 1 : item.index} <br />
                  <span style={lower_text_style}>{item.description}</span>
                </p>
              </div>
            </div>
          ) : (
            <div style={elem_style}>
              <div style={number_style}>
                {item.index == "" ? 1 : item.index}
              </div>
              <div>
                <p style={upper_text_style}>
                  STEP {item.index} <br />
                  <span style={lower_text_style}>{item.description}</span>
                </p>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
