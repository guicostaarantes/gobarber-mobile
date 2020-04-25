import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4ede8;
  margin: 64px 0 24px 0;
`;

export const ForgotContainer = styled.TouchableOpacity`
  margin: 24px;
`;

export const ForgotText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #f4ede8;
`;

export const SignUpContainer = styled.TouchableOpacity`
  flex-direction: row;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-top-width: 1px;
  border-top-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px 0;
  align-items: center;
  justify-content: center;
  background: #312e38;
`;

export const SignUpText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #ff9000;
  margin-left: 10px;
`;
