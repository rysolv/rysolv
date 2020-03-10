import React from 'react';
import iconDictionary from 'utils/iconDictionary';
import { StyledComment } from './styledComponents';

const defaultComment = iconDictionary('comments');

const CommentIcon = () => <StyledComment>{defaultComment}</StyledComment>;

export default CommentIcon;
