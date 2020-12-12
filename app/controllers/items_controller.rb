class ItemsController < ApplicationController
  before_action :set_item, except: [:index, :new, :create]

  def index
    # 商品数がゼロのときはランキングが作れないのでここで終了
    return false if Item.count == 0

    # 配列の箱を作成
    @new_items_arrays = []

    # 新着アイテムを表示したいカテゴリの名前たち
    @categories = ["レディース", "メンズ", "ベビー・キッズ", "インテリア・住まい・小物"]

    # カテゴリの名前たちを使ってカテゴリのインスタンスが入った配列を作成
    @categories = @categories.map{|category_name| Category.find_by(name: category_name)}

    # カテゴリごとの新着アイテムを配列化する
    @categories.each do |category|
      @new_items_arrays << Item.where(category_id: category.subtree_ids).includes(:images, :category).order("created_at DESC").limit(4)
    end
  end

  def new
    @item = Item.new
    @item.images.new

    # 出品ページのカテゴリー
    if params[:parent]
      # respond_toで指定しなくてもjson形式で送られる
      @child_categories = Category.where('ancestry = ?', "#{params[:parent]}")
    else
      @grandchild_categories = Category.where('ancestry LIKE ?', "%/#{params[:child]}")
    end
  end

  def create
    @item = Item.new(item_params)
    @item.save
    @error_messages = @item.errors.messages if @item.errors.present?
    # @error_messages = @item.errors.full_messages if @item.errors.present?
    respond_to do |format|
      format.json
    end
  end

  # トップページの商品一覧表示
  def show
  end

  def edit
  end

  def update
    if @item.update(item_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def purchase_confirmation
  end

  def purchase
    Payjp.api_key = 'sk_test_3ec0dfded55fd39d299b636d'
    customer_id = current_user.card.customer_id
    Payjp::Charge.create(
      amount: @item.price,
      currency: 'jpy',
      # 顧客IDは必須
      customer: customer_id,
    )
    redirect_to root_path, notice: '購入しました'
  end

  private

  def item_params
    params.require(:item).permit(
      :name,
      :price,
      :detail,
      :condition,
      :delivery_fee_payer,
      :delivery_method,
      :delivery_agency,
      :delivery_days,
      :category_id,
      images_attributes: [:src, :_destroy, :id]).merge(user_id: current_user.id)
  end

  def set_item
    @item = Item.find(params[:id])
  end
end
