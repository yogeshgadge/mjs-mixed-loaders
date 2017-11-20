// apple.mjs
import {banana} from './banana.mjs'

banana();

export default function apple() {
    return banana();
}
