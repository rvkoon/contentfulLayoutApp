import GLOBALS from "./globals";

const STYLES = {
  gridWrapper: {
    backgroundColor: GLOBALS.colors.lightGray,
    border: `solid 1px ${GLOBALS.colors.gray}`,
    padding: "10px",
    borderRadius: "0 0 6px 6px",
    marginBottom: "20px",
  },
  gridActions: {
    backgroundColor: GLOBALS.colors.lightGray,
    border: `solid 1px ${GLOBALS.colors.gray}`,
    borderBottom: "none",
    borderRadius: "6px 6px 0 0",
    padding: "5px",
  },
  columnStyle: {
    backgroundColor: "#fff",
    border: "dashed 1px #67728A",
    borderRadius: "6px",
    minHeight: "100%",
  },
  editButton: {
    width: "100%",
    height: "100%",
    // left: "calc(50% - 25px)",
    // top: "calc(50% - 25px)",
  },
};

export default STYLES;
