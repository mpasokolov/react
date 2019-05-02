<?php
/**
 * Created by PhpStorm.
 * User: pc
 * Date: 2019-03-23
 * Time: 17:35
 */

namespace api\modules\v1\controllers;


use common\models\Messages;
use sizeg\jwt\JwtHttpBearerAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;

class MessagesController extends ActiveController {
    public $modelClass = Messages::class;

//    public function behaviors()
//    {
//        $behaviors = parent::behaviors();
//        $behaviors['authenticator'] = [
//            'class' => JwtHttpBearerAuth::class,
//            'optional' => [
//                'index',
//            ],
//        ];
//
//        return $behaviors;
//    }

//    public function behaviors() {
//        $behaviors = parent::behaviors();
//        $behaviors['authenticator'] = [
//            'class' => HttpBearerAuth::class,
//            'auth' => function ($username, $password) {
//                $user = User::findByUsername($username);
//                if ($user !== null && $user -> validatePassword($password)) {
//                    return $user;
//                }
//
//                return null;
//            }
//        ];
//
//        return $behaviors;
//    }
}