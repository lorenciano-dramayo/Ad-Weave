// Sweetalert
import Swal from 'sweetalert2';

// Toast notification
export const Toast = Swal.mixin({
    toast: true,
    icon: 'success',
    position: 'top-right',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});
