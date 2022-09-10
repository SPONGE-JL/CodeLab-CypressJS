import PropTypes from "prop-types";
import AuthService from "services/AuthService";
import style from "./WithdrawalButton.module.scss";

const WithdrawalButton = ({ refreshUser }) => {
  const withdrawal = () => {
    if (window.confirm("[확인] 회원 탈퇴를 진행합니다. (삭제된 계정은 복구가 불가능합니다.)")) {
      AuthService.withdrawal();
      refreshUser();
    }
  };
  return (
    <button
      id="withdrawal"
      className={`${style.withdrawal} form_btn`}
      onClick={withdrawal}
    >
      Withdrawal
    </button>
  );
};

WithdrawalButton.propTypes = {
  refreshUser: PropTypes.func.isRequired
};

export default WithdrawalButton;