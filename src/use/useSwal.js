import Swal from "sweetalert2";

export const useSwal = () => {
  const Toast = {
    baseOptions : {
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    },
    success: function (title) {
       return fire({
        ...this.baseOptions,
        icon: 'success',
        title
      })
    },
    error: function (title) {
      return fire({
        ...this.baseOptions,
        icon: 'error',
        title
      })
    }
  }

  const fire = (options) => Swal.fire(options)

  return {
    Toast
  }
}