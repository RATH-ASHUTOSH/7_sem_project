const inputs = document.querySelectorAll('.input');

function focusFunc(){
	let parent = this.parentNode.parentNode;
	parent.classList.add('focus');
}

function blurFunc(){
	let parent = this.parentNode.parentNode;
	if(this.value == "")
	{
		parent.classList.remove('focus');
	}
}

inputs.forEach(input => {
	input.addEventListener('focus', focusFunc);
	input.addEventListener('blur', blurFunc);
});

function viewPassword(){

  var passwordInput = document.getElementById('password-field');
  var passStatus = document.getElementById('pass-status');

    if (passwordInput.type == 'password')
  {
    passwordInput.type='text';
    passStatus.className='fa fa-eye-slash';
  }
  else
  {
    passwordInput.type='password';
    passStatus.className='fa fa-eye';
  }
}