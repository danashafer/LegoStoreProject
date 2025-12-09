import { FC, useState } from "react";
import { CreateLegoDto, Lego, NewLegoFormData } from "../../utils/types";

type NewLegoFormProps = {
  //   isOpen: boolean;
  onClose: () => void;
  onSubmitAddNewSet: (newLego: NewLegoFormData) => Promise<void> | void;
};

export const NewLegoForm: FC<NewLegoFormProps> = ({
  onClose,
  onSubmitAddNewSet,
}) => {
  //   if (!isOpen) return null;

  const [newLego, setNewLego] = useState<NewLegoFormData>({
    name: "",
    price: 0,
    description: "",
    amount: 0,
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmitAddNewSet(newLego);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error while creating lego");
    } finally {
      setLoading(false);
    }
    // console.log("submiting");
    // await onSubmitAddNewSet(newLego);
    // onClose();
    //   await onLogin(email, password);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setNewLego((prev) => ({
      ...prev,
      file: f,
    }));
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
          zIndex: 9999,
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
              <label>set name</label>
              <input
                type="text"
                className="form-control"
                id="setNameInput"
                placeholder="set name"
                required
                onChange={(e) =>
                  setNewLego((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label>description</label>
              <input
                type="text"
                className="form-control"
                id="inputDescription"
                placeholder="description"
                required
                onChange={(e) =>
                  setNewLego((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label>price</label>
              <input
                type="number"
                className="form-control"
                id="priceInput"
                placeholder="0"
                required
                min="0.01"
                step=".01"
                onChange={(e) =>
                  setNewLego((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label>amount in store</label>
              <input
                type="number"
                className="form-control"
                id="priceInput"
                placeholder="0"
                required
                min={1}
                onChange={(e) =>
                  setNewLego((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label>
                Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#ffcce1" }}
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
