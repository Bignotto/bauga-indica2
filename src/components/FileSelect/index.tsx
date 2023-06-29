import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useRef } from "react";

import { MdImage } from "react-icons/md";

type FileSelectProps = {
  name?: string;
  placeholder?: string;
};

const FileSelect = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <MdImage />
      </InputLeftElement>
      <input
        type="file"
        accept='"image/png, image/jpeg"'
        ref={inputRef}
        style={{ display: "none" }}
      ></input>
      <Input
        placeholder={"Your file ..."}
        value={inputRef.current?.value}
        contentEditable={false}
      />
      <InputRightElement>
        <Button onClick={() => inputRef.current?.click()} colorScheme="blue">
          ...
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default FileSelect;
