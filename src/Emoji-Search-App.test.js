import React from "react";
import App from "./App";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import emojiList from "./emojiList.json";
import userEvent from '@testing-library/user-event';


describe("emoji search tests", () => {

  beforeEach(()=> {
    render(<App/>);
  });


  it("header render test", () => {
    let header = screen.getByText("Emoji Search");
    expect(header).toBeInTheDocument();
  });



  it("initial emoji list render test", () => {
    let filteredEmoji = emojiList.slice(0,20);
    filteredEmoji.map((emo) => {
      expect(screen.getByText(emo.title)).toBeInTheDocument();
    });
  });



   test("if list is re-rendered after filtering", () => {
     let input = screen.getByRole("input");
     fireEvent.change(input, {target: {value:  "joy"}});
     expect(screen.getAllByText(/joy/i)).toHaveLength(3);
   });


   test("if emoji copying works", () => {
    let emoji = screen.getByText(/joy/i);
    let emojiText = "Joy";
    userEvent.click(emoji);
    expect(emoji).toHaveTextContent(emojiText);
   });


});