import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { RiErrorWarningLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

/* Estilos del dropzone */
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

/* Inicio del componente */
const Dropzone = ({ setMeDrink, meDrink }) => {
  /* state de la imagen para vista previa  */
  const [imageFile, setimageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState([]);
  const [exceededLimit, setExceededLimit] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      setExceededLimit(true);
      setTimeout(() => {
        setExceededLimit(false);
      }, 2000);
    } else {
      setSelectedImage(
        acceptedFiles.map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
        }))
      );

      console.log(acceptedFiles[0]);
      setimageFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: "image/*", onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject || exceededLimit ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject, exceededLimit]
  );

  /* crear elemento de imagen */
  const image = selectedImage?.map((file, index) => (
    <div key={index}>
      <img
        src={file.preview}
        className="img-fluid rounded-1"
        width={200}
        height={200}
        alt={file.name}
      />
    </div>
  ));

  const handleUrl = () => {
    // Obtener la extensión de la imagen
    const extension = imageFile.name.split(".").pop().toLowerCase();
    // Crear un nombre único para la imagen
    const name = `image-${uuidv4()}.${extension}`;

    //console.log(name);
    //console.log(imageFile);

    //const uploadImage = { ...imageFile, name: name, path: name };

    const uploadImage = new File([imageFile], name, {
      type: imageFile.type,
      lastModified: imageFile.lastModified,
      lastModifiedDate: imageFile.lastModifiedDate,
    });
    
    uploadImage.path = name;
    

    setMeDrink({...meDrink,
      image: uploadImage,
    });

    console.log(meDrink)

    //console.log(uploadImage);
  };

  useEffect(() => {
    
    if (imageFile) {
      handleUrl();
    }

    // eslint-disable-next-line
  }, [imageFile]);

  return (
    <>
      <div className="container mt-2">
        {/* input del dropzone */}
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag and drop the image here, or click to select the image</p>
        </div>

        {/* Mensaje de aviso */}
        {exceededLimit && (
          <p className="text-danger mt-2 text-center">
            Solo puedes subir una imagen <RiErrorWarningLine />
          </p>
        )}

        {/* vista previa de la imagen */}
        <div className="d-flex justify-content-center align-items-center mt-3">
          {image}
        </div>



      </div>
    </>
  );
};

export default Dropzone;
