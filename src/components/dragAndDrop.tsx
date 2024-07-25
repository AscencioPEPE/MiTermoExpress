import { Button, Image } from '@nextui-org/react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FieldValues, Path, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { FileImageType } from '../hooks/useDragDrop';
// import { UploadIcon } from "components/Icons"
// import { FileImageType } from "hooks/useDragDrop"

interface DragAndDropProps<T, U extends FieldValues> {
  onDrop: (acceptedFiles: File[]) => void; // Function to handle dropped files
  selectedFile: FileImageType[]; // Array of selected files
  filesTypes: string; // String representing accepted file types
  register: UseFormRegister<U>; // Form register function from react-hook-form
  watch: UseFormWatch<U>; // Form watch function from react-hook-form
  resetValue: () => void; // Function to reset value
  registerKey: Path<U>; // Path to the field in the form values
  clearSelectedFile: () => void;
}

const DragAndDrop = <T, U extends FieldValues>({
  onDrop,
  selectedFile,
  filesTypes,
  register,
  clearSelectedFile,
  watch,
  resetValue,
  registerKey,
}: DragAndDropProps<T, U>) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Callback function to handle file drop
  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      // When files are dropped, execute the onDrop function passed as a prop
      onDrop(acceptedFiles);

      // Get the first accepted file from the dropped files
      const file = acceptedFiles[0];

      // Create a new FileReader object to read the contents of the file
      const reader = new FileReader();

      // Define an event handler for when the file contents are loaded
      reader.onload = () => {
        // Get the result of reading the file contents as a data URL
        const previewImage = reader.result as string;

        // Set the previewImage state with the loaded data URL
        setPreviewImage(previewImage);
      };

      // Read the contents of the file as a data URL
      reader.readAsDataURL(file!);
    },
    // useCallback dependencies: re-create the function only if onDrop function changes
    [onDrop]
  );

  // Get dropzone props from react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
  });

  // Effect to reset preview image when selected files are empty
  useEffect(() => {
    if (selectedFile.length === 0) {
      setPreviewImage(null);
      resetValue();
    }

    if (typeof selectedFile?.[0] === 'string') {
      setPreviewImage(selectedFile?.[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  return (
    <>
      {previewImage ? (
        // Display preview image if available
        <div className="w-full">
          <div className="flex content-center justify-center">
            {/* Check if the file is an image to show the preview or the name */}
            {selectedFile?.[0]?.name?.includes('.png') ? (
              <div className="relative">
                <Image src={previewImage} alt="Preview" className="size-[200px] object-contain" />
                <Button
                  className="absolute -right-10 top-0 z-10 rounded-full"
                  isIconOnly
                  onClick={() => {
                    resetValue();
                    clearSelectedFile();
                    setPreviewImage(null);
                  }}
                >
                  X
                </Button>
              </div>
            ) : previewImage ? (
              <div className="relative">
                <Image src={previewImage} alt="Preview" className="size-[200px] object-contain" />
                <Button
                  className="absolute -right-10 top-0 z-10 rounded-full"
                  isIconOnly
                  onClick={() => {
                    setPreviewImage(null);
                  }}
                >
                  X
                </Button>
              </div>
            ) : (
              <p>{selectedFile?.[0]?.name}</p>
            )}
          </div>
        </div>
      ) : (
        // Display dropzone if no preview image available
        <div
          {...getRootProps()}
          style={{
            width: '100%',
            height: '200px',
            border: '2px dashed #ccc',
            backgroundColor: isDragActive ? 'hsla(37 93% 53%)' : 'transparent',
          }}
          className="mt-4 flex cursor-pointer items-center justify-center rounded-xl "
        >
          <input
            {...getInputProps()}
            style={{ display: 'none' }}
            {...register(registerKey, {
              required: watch(registerKey)?.length > 0 ? false : 'Inserta un archivo valido',
            })}
          />

          {isDragActive ? (
            <p>Suelta el archivo aqui</p>
          ) : (
            <div className="flex w-1/3 flex-col flex-wrap items-center justify-center">
              {/* <UploadIcon /> */}
              <p className="text-tertiary text-center">Subir documentos ({filesTypes})</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DragAndDrop;
