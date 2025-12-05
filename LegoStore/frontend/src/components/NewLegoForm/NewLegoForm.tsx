import { FC, useState } from "react";

type NewLegoFormProps = {
  //   isOpen: boolean;
  onClose: () => void;
  onSubmitAddNewSet: (
    setName: string,
    description: string,
    price: number
  ) => Promise<void> | void;
};

export const NewLegoForm: FC<NewLegoFormProps> = ({
  onClose,
  onSubmitAddNewSet,
}) => {
  //   if (!isOpen) return null;

  const [setName, setSetName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submiting");
    await onSubmitAddNewSet(setName, description, price);
    //   await onLogin(email, password);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            minWidth: "320px",
            maxWidth: "90vw",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <h2>Add a new lego</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {" "}
              <label>dont have an account?</label>
              <button className="btn btn-secondary">Sign up</button>
            </div>

            <div className="form-group">
              <label>set name</label>
              <input
                type="text"
                className="form-control"
                id="setNameInput"
                placeholder="set name"
                onChange={(e) => setSetName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>description</label>
              <input
                type="text"
                className="form-control"
                id="inputDescription"
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>price</label>
              <input
                type="number"
                className="form-control"
                id="priceInput"
                placeholder="0"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
