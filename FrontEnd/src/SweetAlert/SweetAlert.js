import Swal from "sweetalert2";

export const SweetAlertSuccess = () => {

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'The request was made successfully',
    showConfirmButton: false,
    timer: 1500
  })
 };

export const SweetAlertError = (message) => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'There was an error',
    text: message,
    showConfirmButton: false,
    timer: 1500
  })
 }