import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField, IconButton } from "@material-ui/core";
import { CommonapiCall } from "../../../src/utils/Network";
import ClearIcon from "../../assets/icons/cancelclose.svg";
import "./Material.css";
import GreyCircleIcon from "../../assets/icons/greycheckcircle.svg";
import GreenCircleIcon from "../../assets/icons/Greencheckcircle.svg";
import CloseIcon from "../../assets/icons/closeIcon.svg";
import WarningIcon from "../../assets/icons/tasks-management/warning.svg";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchIcon from "../../assets/icons/SearchIcon.svg";
import loadingIcon from "../../assets/icons/loadingAnimation.gif";
import { useTranslation } from "react-i18next";
import { translations } from "../../locales/translations";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MaterialsRecipesInterface { }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MaterialsRecipes: React.FC<MaterialsRecipesInterface> = (props) => {
  const { t } = useTranslation();
  const [MaterialRows, setMaterialRows] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = React.useState(true);
  const [loader, setloader] = React.useState(true);
  const [SearchItem, setSearchItem] = React.useState("");
  const [MaterialNotFound, setMaterialNotFound] = React.useState(false);
  const [searchError, setsearchError] = useState({ Error: false, Text: "" });
  useEffect(() => {
    setTimeout(() => {
      GetMaterials();
    }, 2000);
  }, []);

  function GetMaterials() {
    const GetJobId = window.sessionStorage.getItem("ngStorage-jobId");
    const requestURL = `GetJobRecipeMaterials`;
    const requestMaterial = {
      JobID: GetJobId,
    };
    try {
      window.sessionStorage.setItem("ngStorage-totalMaterials", "0");
      window.sessionStorage.setItem("ngStorage-countMaterials", "0");
      setloader(true)
      CommonapiCall(requestURL, "POST", requestMaterial)
        .then((response) => {          
          setMaterialRows(response.ResponseDictionaryDT.Materials);
          setloader(false)
          window.sessionStorage.setItem("ngStorage-VerifiedMaterial", "false");       
          if (response.ResponseDictionaryDT.Materials != undefined) {
            window.sessionStorage.setItem("ngStorage-totalMaterials", response.ResponseDictionaryDT.Materials.length.toString());
          }
          else {
            window.sessionStorage.setItem("ngStorage-totalMaterials", "0");
          }
        })
        .catch((err) => {
          setloader(false)
          console.log("Geterror", err);
        });
    } catch (err: any) {
      setloader(false)
      console.log("error ", err);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setSearchItem("");
      setMaterialNotFound(false);
    } else {
      setsearchError({ Error: false, Text: "" });
      setSearchItem(event.target.value.trim());
    }
  };
  const handleCLearClick = () => {
    if (SearchItem === "") {
      setsearchError({ Error: true, Text: "Enter search Material" });
    } else {
      setSearchItem("");

    }
  };
  const handleEnter = (event: any) => {
    if (event.key === "Enter" && SearchItem === "") {
      setsearchError({ Error: true, Text: "Enter search Material" });
    } else if (event.key === "Enter") {
      SetSearchMaterials();
    }
  };
  const handlesearchclick = (event: any) => {
    console.log("event ", event);
    if (SearchItem === "") {
      setsearchError({ Error: true, Text: "Enter search Material" });
    } else {
      SetSearchMaterials();
    }
  };
  function SetSearchMaterials() {
    setsearchError({ Error: false, Text: "" });
    let MaterialRowsList = [...MaterialRows];
    let requests = [...MaterialRows];
    let SearchedMaterial = requests.find(
      (x) =>
        x.MaterialName.toLowerCase() === SearchItem.toLowerCase() ||
        x.CatalogID === SearchItem
    );
    if (SearchedMaterial != undefined) {
      requests.find(
        (x) =>
          x.MaterialName.toLowerCase() === SearchItem.toLowerCase() ||
          x.CatalogID === SearchItem
      ).verification = true;
      let verifiedMaterials = requests.filter((x) => x.verification === true);
      window.sessionStorage.setItem("ngStorage-countMaterials", verifiedMaterials.length.toString());

      if (MaterialRowsList.length === verifiedMaterials.length) {

        window.sessionStorage.setItem("ngStorage-VerifiedMaterial", "true");
      }
      setMaterialRows(requests);
      setSearchItem("");
    } else {
      window.sessionStorage.setItem("ngStorage-VerifiedMaterial", "false");
      setMaterialNotFound(true);
    }

  }
  const handleClose = () => {
    setMaterialNotFound(false);
  };
  return (
    <React.Fragment>
      <div>
        {loader ?
          <img src={loadingIcon} alt="loadIcon" style={{ height: "50px", marginLeft: "550px" }} />
          :
          MaterialRows && MaterialRows.length > 0 ? (
            <div className="padd_15">
              <TextField
                fullWidth
                id="standard-bare"
                variant="outlined"
                placeholder={t(
                  translations.MaterialsManagement.MATERIALS_SEARCH_TEXT
                )}
                value={SearchItem}
                onChange={handleChange}
                helperText={searchError.Error ? searchError.Text : null}
                error={searchError.Error}
                onKeyPress={handleEnter}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleCLearClick}>
                      {SearchItem.length > 0 ? (
                        <img
                          src={ClearIcon}
                          alt="CancelIcon"
                          style={{ width: "8px" }}
                        />
                      ) : null}
                    </IconButton>
                  ),
                  startAdornment: (
                    <IconButton onClick={handlesearchclick}>
                      {<img src={SearchIcon} alt="SearchIcon" />}
                    </IconButton>
                  ),
                }}
              />

              <TableContainer component={Paper} className="activateJobTableDiv">
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label="Material table"
                  className="activateJobTable"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {t(translations.MaterialsManagement.MATERIALS_NAME_TEXT)}
                      </TableCell>
                      <TableCell>
                        {t(translations.MaterialsManagement.MATERIALS_CATALOG_TEXT)}
                      </TableCell>
                      <TableCell align="right">
                        {t(
                          translations.MaterialsManagement
                            .MATERIALS_DESCRIPTION_TEXT
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {t(translations.MaterialsManagement.VERIFICATION_TEXT)}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {MaterialRows.map((row: any) => (
                      <TableRow
                        key={row.MaterialName}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        className={row.verification ? "MaterialsSearchrow" : ""}
                      >
                        <TableCell>{row.MaterialName}</TableCell>
                        <TableCell>{row.CatalogID}</TableCell>
                        <TableCell align="right">{row.Description}</TableCell>
                        <TableCell align="right">
                          {" "}
                          <img
                            src={
                              row.verification ? GreenCircleIcon : GreyCircleIcon
                            }
                            alt="React Logo"
                            style={{ width: "28px" }}
                          />{" "}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <div> {t(translations.MaterialsManagement.MATERIALS_NOT_FOUND)}</div>
          )
        }
        {MaterialNotFound ? (
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div className="text-right">
                <img
                  src={CloseIcon}
                  alt="Warning"
                  className="closeIconHeader"
                  onClick={handleClose}
                />
              </div>
              <DialogTitle id="alert-dialog-title">
                <img
                  src={WarningIcon}
                  alt="Warning"
                  style={{ marginRight: "8px" }}
                />

                {t(translations.MaterialsManagement.MATERIALS_NOT_FOUND_TEXT)}
              </DialogTitle>
              <DialogContent className="Dialog_body">
                <DialogContentText id="alert-dialog-description">
                  {t(
                    translations.MaterialsManagement.MATERIALS_NOT_FOUND_MESSAGE
                  )}
                </DialogContentText>
              </DialogContent>
              <DialogActions className="DialogActions">
                <Button onClick={handleClose} className="btn btn primary">
                  {" "}
                  {t(translations.MaterialsManagement.MATERIALS_GOT_IT)}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : null}

      </div>
    </React.Fragment>
  );
};

export default MaterialsRecipes;
