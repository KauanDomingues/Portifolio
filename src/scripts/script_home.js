const glow = document.getElementById('mouse-glow');

document.addEventListener('mousemove', (e) => {
  glow.style.top = `${e.clientY}px`;
  glow.style.left = `${e.clientX}px`;
});


document.addEventListener('DOMContentLoaded', () => {
    
    // Carrossel progetos
    const proCarItems = document.querySelectorAll('.pro-car-item');
    let proCarCurrent = 0;

    document.getElementById('pro-car-next').addEventListener('click', function() {
        proCarItems[proCarCurrent].classList.remove('active');
        proCarCurrent = (proCarCurrent + 1) % proCarItems.length;
        proCarItems[proCarCurrent].classList.add('active');
    })

    document.getElementById('pro-car-prev').addEventListener('click', function(){
        proCarItems[proCarCurrent].classList.remove('active');
        proCarCurrent = (proCarCurrent - 1 + proCarItems.length) % proCarItems.length;
        proCarItems[proCarCurrent].classList.add('active');
    })


    
    // Carrossel certificados
    const certCarItems = document.querySelectorAll('.cert-car-item');
    let certCarCurrent = 0;

    document.getElementById('cert-car-next').addEventListener('click', function() {
        for (var idn = 0; idn < certCarItems.length; idn++) {
            certCarItems[idn].classList.remove('active');
        };
        certCarCurrent = (certCarCurrent + 1) % certCarItems.length;
        certCarItems[certCarCurrent].classList.add('active');
    })

    document.getElementById('cert-car-prev').addEventListener('click', function(){
        for (var idn = 0; idn < certCarItems.length; idn++) {
            certCarItems[idn].classList.remove('active');
        };
        certCarCurrent = (certCarCurrent - 1 + certCarItems.length) % certCarItems.length;
        certCarItems[certCarCurrent].classList.add('active');
    })

    // Modal
    const modalCert = document.getElementById('modal-certificates');
    const modalCertContent = document.getElementById('modal-certificates-content');

    document.querySelectorAll('.certificates-container-img').forEach(elemento => {
        elemento.addEventListener('click', (event) => {
            for (var idn = 0; idn < certCarItems.length; idn++) {
                certCarItems[idn].classList.remove('active');
            };
            modalCert.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            const id = event.currentTarget.dataset.id;
            console.log(id)
            certCarItems[id].classList.add('active');
        });
    });

    modalCert.addEventListener('click', function (e) {
    if (e.target == modalCert && e.target != modalCertContent) {
        document.body.style.overflow = '';
        modalCert.style.display = 'none';
    }
    });
});

