function numberFormat(value) {
    const formatter = new Intl.NumberFormat('ru-RU');
  
    return formatter.format(value);
  }


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