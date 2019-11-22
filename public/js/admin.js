const deleteProduct = (btn) => {
    console.log('Clicked Delete Button');
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

};