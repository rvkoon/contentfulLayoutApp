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
    border: "dashed 1px #CFD9E0",
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
    backgroundColor: "rgb(247, 249, 250, 0.95)",
    border: "none",
  },
  mediaContentEdit: {
    backgroundColor: GLOBALS.colors.lightGray,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    gap: 20,
    overflow: "hidden",
  },
  mediaContentHeader: {
    backgroundColor: "rgb(247, 249, 250, 0.95)",
    top: 0,
    left: 0,
    width: "100%",
    height: 41,
    marginBottom: 10,
  },
  sectionBtns: {
    display: "flex",
    gap: "5px",
  },
};

export default STYLES;
