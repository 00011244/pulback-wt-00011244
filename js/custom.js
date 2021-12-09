function numberFormat(value) {
    const formatter = new Intl.NumberFormat('ru-RU');
  
    return formatter.format(value);
  }

  (function () {
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })();

// Cashback calculator
(function () {
    const inputElements = document.querySelectorAll('#cashback-calculator input[type=range]');
  
    function updateSum() {
      const sum = Array.from(inputElements).reduce(function (acc, item) {
        return Math.round(acc + (item.value * item.getAttribute('data-cashback-percent') / 100))
      }, 0)
  
      document.getElementById('cashback-sum').textContent = numberFormat(sum)
    }
  
    inputElements.forEach(function (el) {
      el.addEventListener('input', function () {
        const value = el.value;
        const container = document.querySelector('label[for=' + el.id + '] span')
  
        container.textContent = numberFormat(value);
        updateSum();
      })
    })
  })();

  // Currency calculator
(function () {
    const rates = {
      usd: 10769,
      rub: 146,
      eur: 12166,
      gbp: 14280
    };
  
    const inputEl = document.querySelector('#currency-calculator .custom-input');
  
    function renderTableBody() {
      const oldTbodyEl = document.querySelector('#currency-calculator #currency-table tbody');
      if (oldTbodyEl !== null) {
        oldTbodyEl.remove();
      }
  
      const tbodyEl = document.createElement('tbody');
  
      Object.keys(rates).forEach(function (itemKey) {
        const rowEl = document.createElement('tr');
        const resultEl = document.createElement('td');
        resultEl.textContent = +(inputEl.value / rates[itemKey]).toFixed(2) + ' ' + itemKey.toUpperCase();
  
        const rateEl = document.createElement('td');
        rateEl.textContent = rates[itemKey] + ' UZS';
  
        rowEl.append(resultEl, rateEl)
        tbodyEl.appendChild(rowEl);
      });
  
      document.getElementById('currency-table').appendChild(tbodyEl)
    }
  
    renderTableBody();
  
    inputEl.addEventListener('input', function () {
      inputEl.value = inputEl.value.slice(0, 9)
      renderTableBody();
    });
  })();

// Link generator
(function () {
    const btnEl = document.getElementById('link-copy-button');
    const tooltip = new bootstrap.Tooltip(btnEl);
    const linkEl = document.getElementById('generated-link');
  
    function generateLink() {
      let link = 'get.pulback.com/';
      link += (Math.random() + 1).toString(36).substring(6).toUpperCase();
  
      linkEl.textContent = link;
    }
  
    generateLink();
  
    btnEl.addEventListener('click', function () {
      const tooltipEl = document.getElementById(btnEl.getAttribute('aria-describedby'));
  
      navigator.clipboard.writeText(linkEl.innerText);
  
      tooltipEl.querySelector('.tooltip-inner').textContent = 'Copied!';
      tooltip.update();
    });
  
    document.getElementById('link-generate-btn').addEventListener('click', generateLink);
  })();

  // Handle transfer money modal form
(function () {
    const bsModal = new bootstrap.Modal(document.getElementById('transfer-money-modal'));
  
    const formWindow = document.querySelector('.form-window');
    const loadingWindow = document.querySelector('.loading-window');
    const successWindow = document.querySelector('.success-window');
  
    const formEl = document.getElementById('transfer-money-modal-form');
  
    formEl.addEventListener('submit', function (event) {
      event.preventDefault();
  
      if(!formEl.checkValidity()) {
        return;
      }
  
      formWindow.classList.add('d-none');
      loadingWindow.classList.remove('d-none');
  
      setTimeout(function () {
        loadingWindow.classList.add('d-none');
        successWindow.classList.remove('d-none');
      }, 2000)
    })
  
    document.querySelector('.success-window button').addEventListener('click', function () {
      successWindow.classList.add('d-none');
      formWindow.classList.remove('d-none');
      formEl.classList.remove('was-validated');
      formEl.reset();
      bsModal.hide();
    })
  })();