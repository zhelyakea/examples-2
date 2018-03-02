import React from "react";
import Button from "../Button";
import { TopWrapper, WordWrapper, ActionsWrapper } from "./Wrappers";
import KeyboardButton from "./KeyboardButton";
import withKeyboard from "./withKeyboard";
import { keyArr } from "./keyArr";

export const Keyboard = ({
  isSearch,
  lang,
  currLang,
  changeLang,
  currentLang,
  enterWord,
  deleteWord
}) => (
  <TopWrapper>
    <WordWrapper>
      {keyArr.numbers.map(value => (
        <KeyboardButton {...{ value, enterWord }} />
      ))}
    </WordWrapper>
    {keyArr[lang].map(value => (
      <WordWrapper {...{ key: value }}>
        {value.map(word => <KeyboardButton {...{ value: word, enterWord }} />)}
      </WordWrapper>
    ))}
    <ActionsWrapper>
      {isSearch && (
        <Button
          type="keyboard"
          name="changelang"
          arg={currLang}
          handleClick={changeLang}
          children={lang}
        />
      )}
      <Button type="keyboard" name="space" arg={" "} handleClick={enterWord} />
      <Button
        type="keyboard"
        name="backspace"
        handleClick={deleteWord}
        children="backspace"
      />
    </ActionsWrapper>
  </TopWrapper>
);
export default withKeyboard(Keyboard);
