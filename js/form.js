// contacts-form
{
  const tel = document.querySelector('[type="tel"]');
  let telMask = new Inputmask('(+373) 99999999');
  telMask.mask(tel);

  const contactsValid = new JustValidate('#contacts-form');
  contactsValid
    .addField('[name="fio"]', [
      { rule: 'required', errorMessage: 'Введите имя' },
      { rule: 'minLength', value: 3, errorMessage: 'Введите минимум 2 символа' }
    ])
    .addField('[name="tel"]', [
      {
        validator: () => {
          let phone = tel.inputmask.unmaskedvalue();
          return Boolean(+phone && phone.length > 0);
        },
        errorMessage: 'Вы не ввели телефон',
      },
      {
        validator: () => {
          let phone = tel.inputmask.unmaskedvalue();
          return Boolean(+phone && phone.length === 8);
        },
        errorMessage: 'Введите номер полностью'
      }
    ])
    .onSuccess(async (event)=> {
      // console.log(event.target)
      let form = event.target;
      let formData = new FormData(form);
      disableInputs(form.elements);
      let response = await fetch('send-mail.php', {
        method: 'POST',
        body: formData
      });
      if(response.ok) {
        let result = await response.json();
        alert(result.message)
        form.reset();
        enableInputs(form.elements);
      } else {
        alert('Ошибка')
        enableInputs(form.elements)
      }
    });

    function disableInputs(inputs) {
      inputs.submitBtn.classList.add('sending');
      [...inputs].forEach(el => {el.disabled = true});
    }

    function enableInputs(inputs) {
      inputs.submitBtn.classList.remove('sending');
      [...inputs].forEach(el =>{el.disabled = false});
    }

  // смена фона при вводе
  const contactInputs = document.querySelectorAll('.contacts__input');
  for (let input of contactInputs) {
    input.addEventListener('input', function () {
      this.style.backgroundColor = 'white';
    })
    input.addEventListener('blur', function () {
      this.style.backgroundColor = '';
    })
  }
}
