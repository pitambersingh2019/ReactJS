/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import { RestoreMenuStyled, Item, Divider } from "./styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";

function RestoreMenu({
  onClickHandler,
  handleRestoreSorting,
  handleRestoreFilter,
  handleRestoreHiddenCols,
  handleRestoreDefaultsButton,
}) {
  const restoreDefaults = () => {
    handleRestoreDefaultsButton();
    onClickHandler && onClickHandler();
  };
  const restoreSorting = () => {
    handleRestoreSorting();

    onClickHandler && onClickHandler();
  };

  const restoreFilter = () => {
    handleRestoreFilter();
    onClickHandler && onClickHandler();
  };

  const restoreHiddenCols = () => {
    handleRestoreHiddenCols();
    onClickHandler && onClickHandler();
  };

  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickHandler && onClickHandler();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickHandler]);

  return (
    <ClickAwayListener onClickAway={onClickHandler}>
      <RestoreMenuStyled ref={ref}>
        <Item onClick={restoreDefaults}>Restore Defaults</Item>
        <Divider />
        <Item onClick={restoreSorting}>Restore Default sorting</Item>
        <Divider />
        <Item onClick={restoreFilter}>Clear all filters</Item>
        <Divider />
        <Item onClick={restoreHiddenCols}>Restore hidden columns</Item>
      </RestoreMenuStyled>
    </ClickAwayListener>
  );
}

export default RestoreMenu;
