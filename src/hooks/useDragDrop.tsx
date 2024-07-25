import { useState } from 'react';

export interface FileImageType {
  file: File | undefined;
  name: string;
  sizeMB: string;
}

interface DragDropProps {
  setValue: any;
  registerKey: string;
}

export const useDragDrop = ({ setValue, registerKey }: DragDropProps) => {
  const [selectedFile, setSelectedFile] = useState<FileImageType[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      // Save data in selectedFile
      const selectedFileData = {
        file: file,
        name: file?.name ?? '',
        sizeMB: (file?.size ?? 0 / (1024 * 1024)).toFixed(2),
      };
      setSelectedFile([selectedFileData]);
      setValue(registerKey, acceptedFiles);
    };

    reader.readAsDataURL(file!);
  };

  const resetValue = () => {
    setValue(registerKey, []);
  };

  const clearSelectedFile = () => {
    setSelectedFile([]);
  };

  return {
    onDrop,
    resetValue,
    clearSelectedFile,
    selectedFile,
  };
};
