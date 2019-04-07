<?php
/**
 * Created by PhpStorm.
 * User: pc
 * Date: 2019-03-23
 * Time: 18:03
 */

namespace api\modules\v1\controllers;


use common\models\Chats;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;

class ChatsController extends ActiveController
{
    public $modelClass = Chats::class;

    public function actions() {
        $actions = parent::actions();
        unset($actions['index']);
        return $actions;
    }

    public function actionIndex() {
        $query = Chats::find()
            -> with('messages');

        return new ActiveDataProvider([
            'query' => $query,
        ]);
    }
}