<?php
/**
 * Created by PhpStorm.
 * User: pc
 * Date: 2019-03-23
 * Time: 17:35
 */

namespace api\modules\v1\controllers;


use common\models\Messages;
use yii\rest\ActiveController;

class MessagesController extends ActiveController {
    public $modelClass = Messages::class;
}