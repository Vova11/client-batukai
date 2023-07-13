import styled from 'styled-components';

const Wrapper = styled.section`
	.login-page {
		width: 460px;
		padding: 8% 0 0;
		margin: auto;
	}
	.form {
		top: 100px;
		position: relative;
		z-index: 1;
		background: #ffffff;
		max-width: 460px;
		margin: 0 auto 100px;
		padding: 45px;
		text-align: center;
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
	}
	.success-box {
		top: 100px;
		position: relative;
		z-index: 1;
		background: #ffffff;
		max-width: 760px;
		margin: 0 auto 100px;
		padding: 45px;
		text-align: center;
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
		background-color: var(--clr-primary-4);
		h4,
		p {
			color: white;
		}
	}
	.success-box-after-registration {
		top: 100px;
		position: relative;
		z-index: 1;
		background: #ffffff;
		max-width: 760px;
		margin: 0 auto 100px;
		padding: 45px;
		text-align: center;
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

		h4,
		p {
			color: white;
		}
	}
	.spinner {
		left: 50%;
		margin-left: -4em;
		position: relative;
		top: 200px;
		top: 40px;
		.spinner-border {
			width: 100px;
			height: 100px;
		}
	}
	.form input {
		font-family: 'Roboto', sans-serif;
		outline: 0;
		background: #f2f2f2;
		width: 100%;
		border: 0;
		margin: 0 0 15px;
		padding: 15px;
		box-sizing: border-box;
		font-size: 14px;
	}
	.form button {
		text-transform: uppercase;
		outline: 0;
		background: var(--clr-primary-5);
		width: 100%;
		border: 0;
		padding: 15px;
		color: #ffffff;
		font-size: 14px;
		-webkit-transition: all 0.3 ease;
		transition: all 0.3 ease;
		cursor: pointer;
	}
	.form button:hover,
	.form button:active,
	.form button:focus {
		color: var(--clr-primary-1);
		background: var(--clr-primary-7);
	}
	.form .message {
		margin: 15px 0 0;
		color: #b3b3b3;
		font-size: 12px;
	}
	.form .message a {
		color: #4caf50;
		text-decoration: none;
	}
	.form .register-form {
		display: none;
	}
	.container {
		position: relative;
		z-index: 1;
		max-width: 300px;
		margin: 0 auto;
	}
	.container:before,
	.container:after {
		content: '';
		display: block;
		clear: both;
	}
	.container .info {
		margin: 50px auto;
		text-align: center;
	}
	.container .info h1 {
		margin: 0 0 15px;
		padding: 0;
		font-size: 36px;
		font-weight: 300;
		color: #1a1a1a;
	}
	.container .info span {
		color: #4d4d4d;
		font-size: 12px;
	}
	.container .info span a {
		color: #000000;
		text-decoration: none;
	}
	.container .info span .fa {
		color: #ef3b3a;
	}
	body {
		background: #76b852; /* fallback for old browsers */
		background: -webkit-linear-gradient(right, #76b852, #8dc26f);
		background: -moz-linear-gradient(right, #76b852, #8dc26f);
		background: -o-linear-gradient(right, #76b852, #8dc26f);
		background: linear-gradient(to left, #76b852, #8dc26f);
		font-family: 'Roboto', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
`;
export default Wrapper;
