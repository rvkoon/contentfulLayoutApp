import GLOBALS from "./globals";

const STYLES = {
  gridWrapper: {
    backgroundColor: "#fff",
    border: `solid 1px ${GLOBALS.colors.gray}`,
    padding: "16px",
    borderRadius: "0 0 6px 6px",
    marginBottom: "40px",
    minHeight: 300,
  },
  gridActions: {
    backgroundColor: GLOBALS.colors.lightGray,
    border: `solid 1px ${GLOBALS.colors.gray}`,
    borderBottom: "none",
    borderRadius: "6px 6px 0 0",
    padding: "5px",
    display: "flex",
    alignItems: "center",
  },
  columnStyle: {
    backgroundColor: "#fff",
    border: "dashed 2px #CFD9E0",
    borderRadius: "6px",
    minHeight: "calc(100% - 20px)",
    padding: "10px",
  },
  editButton: {
    width: "100%",
    height: "100%",
    position: "relative",
    top: "0",
    left: "0",
    backgroundColor: "rgb(207, 217, 224, 0.3)",
    border: "none",
  },
};

export default STYLES;
