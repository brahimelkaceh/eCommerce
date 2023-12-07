import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

const blue = {
  500: "#007FFF",
  700: "#0066CC",
};

export default function Container() {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    nom: "",
    ice: "",
    adresse: "",
    idFacturation: "",
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.id]: event.target.value,
    });
  };

  const handleEnregistrerClick = () => {
    const isValidForm = Object.values(formValues).every(
      (value) => value.trim() !== ""
    );

    setRegistrationSuccess(isValidForm);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledContainer>
      <DialogTitle
        sx={{ fontSize: "1.5rem", marginBottom: "16px", color: blue[700] }}
      >
        Nouveau Client
      </DialogTitle>

      <StyledStack spacing={2}>
        {Object.entries(formValues).map(([key, value]) => (
          <StyledTextField
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            id={key}
            size="small"
            placeholder={`Enter ${key} here`}
            type={key === "ice" ? "number" : "text"}
            value={value}
            onChange={handleInputChange}
            fullWidth
          />
        ))}
      </StyledStack>

      <div style={{ textAlign: "right", marginTop: "16px" }}>
        <DynamicStyledButton onClick={handleEnregistrerClick}>
          Enregistrer
        </DynamicStyledButton>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ color: registrationSuccess ? blue[700] : "red" }}
        >
          {registrationSuccess
            ? "Nouveau client ajouté avec succès"
            : "Erreur d'enregistrement"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {registrationSuccess
              ? "Les détails du nouveau client ont été enregistrés avec succès."
              : "Veuillez remplir tous les champs obligatoires."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
}

const StyledContainer = styled("div")({
  borderRadius: "8px",
  border: "1px solid #ccc",
  padding: "24px",
  width: "40%",
  margin: "auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const StyledStack = styled(Stack)({
  width: "100%",
  gap: "8px",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& input:invalid": {
    borderColor: "red",
  },
}));

const DynamicStyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: blue[500],
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: blue[700],
  },
}));
