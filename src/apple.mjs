// apple.mjs
import {banana} from './banana'

banana();

export default function apple() {
    return banana();
}
