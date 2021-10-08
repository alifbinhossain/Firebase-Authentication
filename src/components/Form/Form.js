import React from "react";
import "./Form.css";

const Form = (props) => {
  console.log(props);

  return (
    <>
      <section className="section-form  py-5">
        {props.children.length > 1 ? (
          <div className="d-flex  align-items-center justify-content-evenly w-25 mx-auto">
            {props.children}
          </div>
        ) : (
          props.children
        )}
      </section>
    </>
  );
};

export default Form;
