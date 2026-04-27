// main.js - WhatStack Frontend Logic

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('proModal');
    const getProBtn = document.getElementById('getProBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const proForm = document.getElementById('proForm');
    const submitProBtn = document.getElementById('submitProBtn');
    const btnText = submitProBtn.querySelector('.btn-text');
    const btnSpinner = submitProBtn.querySelector('.btn-spinner');
    const formMessage = document.getElementById('formMessage');

    // Open Modal
    if (getProBtn) {
        getProBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            // Reset form state
            proForm.reset();
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        });
    }

    // Close Modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Handle Form Submit
    if (proForm) {
        proForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('proName').value.trim();
            const email = document.getElementById('proEmail').value.trim();

            if (!name || !email) return;

            // Loading state
            submitProBtn.disabled = true;
            btnText.style.display = 'none';
            btnSpinner.style.display = 'block';
            formMessage.textContent = '';

            try {
                const response = await fetch('/api/slack', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        name, 
                        email,
                        referrer: document.referrer || 'Direct',
                        currentUrl: window.location.href
                    }),
                });

                if (response.ok) {
                    formMessage.textContent = 'Success! We will be in touch soon.';
                    formMessage.className = 'form-message success';
                    proForm.reset();
                    
                    // Close modal after success
                    setTimeout(() => {
                        modal.classList.remove('active');
                    }, 2500);
                } else {
                    throw new Error('Failed to submit');
                }
            } catch (error) {
                formMessage.textContent = 'Oops! Something went wrong. Please try again.';
                formMessage.className = 'form-message error';
            } finally {
                // Reset button state
                submitProBtn.disabled = false;
                btnText.style.display = 'block';
                btnSpinner.style.display = 'none';
            }
        });
    }
});
