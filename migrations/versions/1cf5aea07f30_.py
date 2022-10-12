"""empty message

<<<<<<< HEAD:migrations/versions/e70c2c3d9e86_.py
<<<<<<<< HEAD:migrations/versions/f5d6f40369a6_.py
Revision ID: f5d6f40369a6
Revises: 
Create Date: 2022-10-07 02:59:46.429618
========
Revision ID: e70c2c3d9e86
Revises: 
Create Date: 2022-10-11 00:40:16.969704
>>>>>>>> 86577469e5776e0169df59b0a62766e93d73050e:migrations/versions/e70c2c3d9e86_.py
=======
Revision ID: 1cf5aea07f30
Revises: 
Create Date: 2022-10-11 23:10:59.472201
>>>>>>> 6a620fbcc55931c318d4fa7df7847c8867a9be7f:migrations/versions/1cf5aea07f30_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<< HEAD:migrations/versions/e70c2c3d9e86_.py
<<<<<<<< HEAD:migrations/versions/f5d6f40369a6_.py
revision = 'f5d6f40369a6'
========
revision = 'e70c2c3d9e86'
>>>>>>>> 86577469e5776e0169df59b0a62766e93d73050e:migrations/versions/e70c2c3d9e86_.py
=======
revision = '1cf5aea07f30'
>>>>>>> 6a620fbcc55931c318d4fa7df7847c8867a9be7f:migrations/versions/1cf5aea07f30_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_type', sa.String(length=20), nullable=False),
    sa.Column('picture', sa.String(length=500), nullable=True),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('percentage', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=False),
    sa.Column('curva_temperatura', sa.String(length=200), nullable=False),
    sa.Column('uso', sa.String(length=200), nullable=False),
    sa.Column('perfil_organoleptico', sa.String(length=200), nullable=False),
    sa.Column('fluidez', sa.String(length=50), nullable=False),
    sa.Column('presentation', sa.Float(), nullable=False),
    sa.Column('price', sa.Float(precision=10), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('stock', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('token_blocked_list',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('token', sa.String(length=1000), nullable=False),
    sa.Column('email', sa.String(length=200), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('token')
    )
    op.create_index(op.f('ix_token_blocked_list_email'), 'token_blocked_list', ['email'], unique=False)
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.Column('last_name', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=80), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('order',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.Column('shipping_address', sa.String(length=80), nullable=False),
    sa.Column('order_state', sa.String(length=80), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_detail',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('price', sa.Float(precision=10), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['order.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order_detail')
    op.drop_table('order')
    op.drop_table('user')
    op.drop_index(op.f('ix_token_blocked_list_email'), table_name='token_blocked_list')
    op.drop_table('token_blocked_list')
    op.drop_table('product')
    # ### end Alembic commands ###
